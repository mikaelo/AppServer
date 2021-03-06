using System;
using Inceptum.AppServer.Hosting;
using Inceptum.AppServer.Model;

namespace Inceptum.AppServer.Windsor
{
    interface IApplicationInstanceFactory:IDisposable
    {
        ApplicationInstance Create(string name, AppServerContext context);
        void Release(ApplicationInstance instance);
    }
}