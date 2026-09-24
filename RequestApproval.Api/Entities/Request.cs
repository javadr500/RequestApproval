namespace RequestApproval.Api.Entities;

public class Request
{
    public Guid Id { get; private set; }

    public string Title { get; private set; } = null!;

    public decimal Amount { get; private set; }

    public string? Description { get; private set; }

    public RequestStatus Status { get; private set; }

    public string CreatedByUserId { get; private set; } = null!;

    public string AssignedRole { get; private set; } = null!;

    public DateTime CreatedAt { get; private set; }

    private Request()
    {
    }

    public Request(
        string title,
        decimal amount,
        string? description,
        string createdByUserId,
        string assignedRole)
    {
        Id = Guid.NewGuid();
        Title = title;
        Amount = amount;
        Description = description;
        CreatedByUserId = createdByUserId;
        AssignedRole = assignedRole;
        Status = RequestStatus.Pending;
        CreatedAt = DateTime.UtcNow;
    }

    public void Approve()
    {
        if (Status != RequestStatus.Pending)
            throw new InvalidOperationException(
                "Only pending requests can be approved.");

        Status = RequestStatus.Approved;
    }

    public void Reject()
    {
        if (Status != RequestStatus.Pending)
            throw new InvalidOperationException(
                "Only pending requests can be rejected.");

        Status = RequestStatus.Rejected;
    }
}