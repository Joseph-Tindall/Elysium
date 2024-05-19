using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Elysium.Server.Core.Data;
using Elysium.Server.Core.Models;

namespace Elysium.Server.Core.Controllers
{
    public class ApplicationsController(CoreDbContext context) : Controller
    {
        // GET: Applications
        public async Task<IActionResult> Index() => View(await context.Applications.ToListAsync());
        

        // GET: Applications/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null) return NotFound();

            var application = await context.Applications
                .FirstOrDefaultAsync(m => m.Id == id);
            if (application == null) return NotFound();
            
            return View(application);
        }

        // GET: Applications/Create
        public IActionResult Create() => View();

        // POST: Applications/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Path,Arguments")] Application application)
        {
            if (!ModelState.IsValid) return View(application);
            
            context.Add(application);
            await context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        // GET: Applications/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return NotFound();

            var application = await context.Applications.FindAsync(id);
            
            if (application == null) return NotFound();
            return View(application);
        }

        // POST: Applications/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Path,Arguments")] Application application)
        {
            if (id != application.Id) return NotFound();

            if (!ModelState.IsValid) return View(application);
            
            try
            {
                context.Update(application);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationExists(application.Id))
                {
                    return NotFound();
                }
                
                throw;
            }
            
            return RedirectToAction(nameof(Index));
        }

        // GET: Applications/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var application = await context.Applications
                .FirstOrDefaultAsync(m => m.Id == id);
            if (application == null) return NotFound();

            return View(application);
        }

        // POST: Applications/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var application = await context.Applications.FindAsync(id);
            if (application != null) context.Applications.Remove(application);
            
            await context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ApplicationExists(int id) => context.Applications.Any(e => e.Id == id);
    }
}
