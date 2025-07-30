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
          string op = Request.QueryString["op"];

      if (op == "retrieveAllLoanInfo")
      {
          // Call RetrieveAllLoanInformation and send the result back
          try
          {
              var service = new TylerVestService();
              string loanInfoJson = service.RetrieveAllLoanInformation();
              Response.Write(loanInfoJson);
          }
          catch (Exception ex)
          {
              Response.Write("Error retrieving loan information");
          }
      }
      else if (string.IsNullOrEmpty(id))
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