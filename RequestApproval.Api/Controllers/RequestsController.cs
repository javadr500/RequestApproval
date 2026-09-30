using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RequestApproval.Api.DTOs.Requests;
using RequestApproval.Api.Entities;
using RequestApproval.Api.Repositories;
using RequestApproval.Api.Services;
using RequestApproval.Api.UnitOfWork;
using System.Security.Claims;

namespace RequestApproval.Api.Controllers;

[ApiController]
[Route("api/requests")]
[Authorize]
public class RequestsController : ControllerBase
{
    private readonly IRequestRepository _repository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRequestRoutingService _routingService;

    public RequestsController(
        IRequestRepository repository,
        IUnitOfWork unitOfWork,
        IRequestRoutingService routingService)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _routingService = routingService;
    }

    [HttpPost]
    [Authorize(Roles = "Employee")]
    public async Task<IActionResult> Create(
        CreateRequestDto request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();

        var assignedRole = _routingService.GetAssignedRole(request.Amount);

        var entity = new Request(
            request.Title,
            request.Amount,
            request.Description,
            userId,
            assignedRole);

        await _repository.AddAsync(
            entity,
            cancellationToken);

        await _unitOfWork.SaveChangesAsync(
            cancellationToken);

        return Ok(ToDto(entity));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        var role = GetCurrentUserRole();

        var requests = await _repository.GetForUserAsync(
            userId,
            role,
            cancellationToken);

        return Ok(requests.Select(ToDto));
    }

    [HttpPost("{id:guid}/approve")]
    [Authorize(Roles = "Manager,Finance")]
    public async Task<IActionResult> Approve(Guid id, CancellationToken cancellationToken)
    {
        var request = await _repository.GetByIdAsync(id, cancellationToken);

        if (request == null)
            return NotFound();

        var currentRoles = await GetCurrentUserRolesAsync();

        if (currentRoles.Contains(request.AssignedRole) == false)
            return Forbid();

        try
        {
            request.Approve();

            await _unitOfWork.SaveChangesAsync(
                cancellationToken);

            return Ok(ToDto(request));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("{id:guid}/reject")]
    [Authorize(Roles = "Manager,Finance")]
    public async Task<IActionResult> Reject(
        Guid id,
        CancellationToken cancellationToken)
    {
        var request =await _repository.GetByIdAsync(id,cancellationToken);

        if (request == null)
            return NotFound();

        var currentRoles = await GetCurrentUserRolesAsync();

        if (currentRoles.Contains(request.AssignedRole) == false)
            return Forbid();

        try
        {
            request.Reject();

            await _unitOfWork.SaveChangesAsync(
                cancellationToken);

            return Ok(ToDto(request));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    private string GetCurrentUserId()
    {
        return User.FindFirstValue(
                   ClaimTypes.NameIdentifier)
               ?? throw new UnauthorizedAccessException();
    }

    private string GetCurrentUserRole()
    {
        return User.FindFirstValue(
                   ClaimTypes.Role)
               ?? throw new UnauthorizedAccessException();
    }

    private async Task<IList<string>> GetCurrentUserRolesAsync()
    {
        var roles = User.FindAll(ClaimTypes.Role)
        .Select(c => c.Value)
        .ToList();

        if (roles.Count == 0)
            throw new UnauthorizedAccessException();

        return roles;
    }




    private static RequestDto ToDto(Request request)
    {
        return new RequestDto(
            request.Id,
            request.Title,
            request.Amount,
            request.Description,
            request.Status,
            request.CreatedByUserId,
            request.AssignedRole,
            request.CreatedAt);
    }
}


