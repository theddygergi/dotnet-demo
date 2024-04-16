using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace backend.Context
{
    public class ExcludeFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            // Check if the schema corresponds to the conflicting type
            if (context.Type == typeof(Microsoft.AspNetCore.Identity.Data.ForgotPasswordRequest))
            {
                // Set the x-ms-visibility extension to internal to exclude it from Swagger
                schema.Extensions.Add("x-ms-visibility", new OpenApiString("internal"));
            }
        }

    }
}
