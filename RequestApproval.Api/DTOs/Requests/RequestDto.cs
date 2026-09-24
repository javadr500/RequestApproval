using RequestApproval.Api.Entities;

namespace RequestApproval.Api.DTOs.Requests;

public record RequestDto(
    Guid Id,
    string Title,
    decimal Amount,
    string? Description,
    RequestStatus Status,
    string CreatedByUserId,
    string AssignedRole,
    DateTime CreatedAt);
    