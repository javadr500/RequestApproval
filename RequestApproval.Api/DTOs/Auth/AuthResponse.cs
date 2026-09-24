namespace RequestApproval.Api.DTOs.Auth;

public record AuthResponse(
    string Token,
    DateTime ExpiresAt);