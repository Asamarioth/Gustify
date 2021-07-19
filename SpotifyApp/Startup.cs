using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using JavaScriptEngineSwitcher.V8;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using React.AspNet;
using SpotifyAPI.Web;
using System;
using System.Collections.Generic;
using static SpotifyAPI.Web.Scopes;

namespace SpotifyApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddReact();
            // Make sure a JS engine is registered, or you will get an error!
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = V8JsEngine.EngineName)
              .AddV8();

            services.AddSingleton(SpotifyClientConfig.CreateDefault());
            services.AddScoped<SpotifyClientBuilder>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("Spotify", policy =>
                {
                    policy.AuthenticationSchemes.Add("Spotify");
                    policy.RequireAuthenticatedUser();
                });
            });
            services
              .AddAuthentication(options =>
              {
                  options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
              })
              .AddCookie(options =>
              {
                  options.ExpireTimeSpan = TimeSpan.FromMinutes(50);
              })
              .AddSpotify(options =>
              {
                  options.ClientId = Configuration["Spotify:ClientId"];
                  options.ClientSecret = Configuration["Spotify:ClientSecret"];
                  //options.CallbackPath = "/Auth/callback";
                  options.SaveTokens = true;

                  var scopes = new List<string> {
            UserReadEmail, UserReadPrivate, PlaylistReadPrivate, PlaylistReadCollaborative, UserTopRead
                };
                  options.Scope.Add(string.Join(",", scopes));
              });
            services.AddRazorPages()
              .AddRazorPagesOptions(options =>
              {
                  options.Conventions.AuthorizeFolder("/", "Spotify");
              });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                // app.UseHsts();
            }

            app.UseHttpsRedirection();
            // Initialise ReactJS.NET. Must be before static files.
            app.UseReact(config =>
            {
                config
                        .SetReuseJavaScriptEngines(true)
                        .SetLoadBabel(true)
                        .SetLoadReact(true)
                        .AddScriptWithoutTransform("~/dist/runtime.js")
                        .AddScriptWithoutTransform("~/dist/vendor.js")
                        .AddScriptWithoutTransform("~/dist/main.js");
                // If you want to use server-side rendering of React components,
                // add all the necessary JavaScript files here. This includes
                // your components as well as all of their dependencies.
                // See http://reactjs.net/ for more information. Example:
                //config
                //    .AddScript("~/js/First.jsx")
                //    .AddScript("~/js/Second.jsx");

                // If you use an external build too (for example, Babel, Webpack,
                // Browserify or Gulp), you can improve performance by disabling
                // ReactJS.NET's version of Babel and loading the pre-transpiled
                // scripts. Example:
                //config
                //    .SetLoadBabel(false)
                //    .AddScriptWithoutTransform("~/Scripts/bundle.server.js");
            });

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
            });
        }
    }
}