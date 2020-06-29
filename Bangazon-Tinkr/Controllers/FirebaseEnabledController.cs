using Bangazon_Tinkr.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.Controllers
{
    public abstract  class FirebaseEnabledController : ControllerBase
    {
        protected string UserId => User.FindFirst(x => x.Type == "user_id").Value;
        protected string UserEmail => User.FindFirst(x => x.Type == ClaimTypes.Email).Value;
    }
}
