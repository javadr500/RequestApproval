using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RequestApproval.Api.Data;
using RequestApproval.Api.Entities;
using RequestApproval.Api.Options;
using RequestApproval.Api.Repositories;
using RequestApproval.Api.Services;
using RequestApproval.Api.UnitOfWork;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
});

builder.Services
    .AddIdentityCore<ApplicationUser>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequiredLength = 5;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();


var jwtKey = configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured.");

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme =JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer =configuration["Jwt:Issuer"],
                ValidAudience =configuration["Jwt:Audience"],
                IssuerSigningKey =new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
            };
    });

builder.Services.AddAuthorization();


builder.Services.Configure<RequestRoutingOptions>(configuration.GetSection("RequestRouting"));

builder.Services.AddScoped(typeof(IRequestRepository),typeof(RequestRepository));
builder.Services.AddScoped<IRequestRepository,RequestRepository>();
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
builder.Services.AddScoped<IRequestRoutingService,RequestRoutingService>();
builder.Services.AddScoped<ITokenService,TokenService>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder => {
                builder.WithOrigins("*");
                builder.WithMethods("GET", "POST");
                builder.AllowAnyHeader();
            });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

await SeedRolesAsync(app);

app.Run();


static async Task SeedRolesAsync(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var roleManager =scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var roles = new[]
    {
        "Employee",
        "Manager",
        "Finance"
    };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(
                new IdentityRole(role));
        }
    }
}


