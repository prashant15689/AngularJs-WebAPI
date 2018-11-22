using Microsoft.EntityFrameworkCore;
using WebAPICore.Models;

namespace WebAPICore.Contexts
{
    public class CompanyContext: DbContext
    {
        public CompanyContext(DbContextOptions<CompanyContext> contextOptions):base(contextOptions)
        {

        }

        public DbSet<Users> User { get; set; }
    }
}
