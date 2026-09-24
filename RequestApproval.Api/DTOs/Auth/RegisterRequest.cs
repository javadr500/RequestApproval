namespace RequestApproval.Api.DTOs.Auth;

public record RegisterRequest(
    string Email,
    string Password);