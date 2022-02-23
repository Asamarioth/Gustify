using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
//using Mvc.Client.Extensions;

namespace SpotTest.Controllers
{
    public class AuthController : Controller
    {
        [HttpGet("~/signin")]
        [HttpPost("~/signin")]
        public async Task<IActionResult> SignIn()
        {
            return Challenge(new AuthenticationProperties { RedirectUri = "/", AllowRefresh = true }, "Spotify");
        }

        [HttpGet("~/signout")]
        [HttpPost("~/signout")]
        public IActionResult SignOutCurrentUser()
        {
            return SignOut(new AuthenticationProperties { RedirectUri = "/"},
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
        [HttpGet("~/status")]
        [HttpPost("~/status")]
        public bool CheckIfUserIsAuthenticated()
        {
            return User.Identity.IsAuthenticated;
        }
    }
}
