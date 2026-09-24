using Microsoft.EntityFrameworkCore;
using RequestApproval.Api.Data;
using RequestApproval.Api.Entities;

namespace RequestApproval.Api.Repositories;

public interface IRequestRepository
{
    Task<Request?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<Request>> GetForUserAsync(string userId, string role, CancellationToken cancellationToken = default);
    Task AddAsync(Request entity, CancellationToken cancellationToken = default);
    void Update(Request entity);
}


public class RequestRepository : IRequestRepository
{
    protected readonly AppDbContext _context;
    private readonly DbSet<Request> _request;

    public RequestRepository(AppDbContext context)
    {
        _context = context;
        _request = context.Set<Request>();
    }

    public async Task<Request?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _request.FindAsync([id], cancellationToken);
    }

    public async Task<List<Request>> GetForUserAsync(string userId,string role,CancellationToken cancellationToken = default)
    {
        return await _context.Requests
            .AsNoTracking()
            .Where(x =>
                x.CreatedByUserId == userId ||
                x.AssignedRole == role)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(Request entity, CancellationToken cancellationToken = default)
    {
        await _request.AddAsync(entity, cancellationToken);
    }

    public void Update(Request entity)
    {
        _request.Update(entity);
    }
}



