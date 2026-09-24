using Microsoft.Extensions.Options;
using RequestApproval.Api.Options;

namespace RequestApproval.Api.Services;

public interface IRequestRoutingService
{
    string GetAssignedRole(decimal amount);
}

public class RequestRoutingService : IRequestRoutingService
{
    private readonly RequestRoutingOptions _options;

    public RequestRoutingService(IOptions<RequestRoutingOptions> options)
    {
        _options = options.Value;
    }

    public string GetAssignedRole(decimal amount)
    {
        return amount <= _options.ManagerThreshold
            ? "Manager"
            : "Finance";
    }
}


