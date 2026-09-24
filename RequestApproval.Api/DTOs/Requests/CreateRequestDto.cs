namespace RequestApproval.Api.DTOs.Requests;

public record CreateRequestDto(
    string Title,
    decimal Amount,
    string? Description);