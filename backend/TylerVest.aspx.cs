using System;
using TylerVest_Service;

public partial class TestPage : System.Web.UI.Page
{

  protected void Page_Load(object sender, EventArgs e)
  {
    Response.ContentType = "text/plain"; // or "application/json", etc.

    string data = "";
    
    using (var reader = new System.IO.StreamReader(Request.InputStream))
    {
      data = reader.ReadToEnd();
    }
    
    if (!string.IsNullOrEmpty(data))
    {
      string op = Request.QueryString["op"];
      string id = Request.QueryString["id"];

      if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(data))
        Response.Write("Error! ID parameter must be sent as a parameter and the data in the request body.");

      var service = new TylerVestService();
      service.Save(id, data);

      Response.Write("Saved!");
    }
    else
    {
      string id = Request.QueryString["id"];

      if (string.IsNullOrEmpty(id))
        Response.Write("Error! ID parameter must be sent as a parameter.");
      else
      {
        var service = new TylerVestService();
        Response.Write(service.Load(id));
      }
    }

    Response.End();

  }
}