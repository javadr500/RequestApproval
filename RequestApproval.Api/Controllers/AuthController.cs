using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RequestApproval.Api.DTOs.Auth;
using RequestApproval.Api.Entities;
using RequestApproval.Api.Services;

namespace RequestApproval.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthController(UserManager<ApplicationUser> userManager,ITokenService tokenService) 
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var existingUser = await _userManager.FindByEmailAsync(request.Email);

        if (existingUser != null)
            return BadRequest("User already exists.");

        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user,request.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        await _userManager.AddToRoleAsync(user,"Employee");
        var (token, expiresAt) =await _tokenService.CreateTokenAsync(user);
        return Ok(new AuthResponse(token, expiresAt));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user =await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
            return Unauthorized();

        var validPassword =await _userManager.CheckPasswordAsync(user,request.Password);

        if (!validPassword)
            return Unauthorized();

        var (token, expiresAt) =
            await _tokenService.CreateTokenAsync(user);

        return Ok(new AuthResponse(token, expiresAt));
    }
}

