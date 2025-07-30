using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Text.Json;
using System.Web.Script.Serialization;

namespace TylerVest_Service
{
  public class TylerVestService
  {
    public void Save(string ID, string data)
    {
      //if (ID.Contains("Add_Loan")) {
        string connectionString = "Server=PLAPVSVODYDB10\\WEBAPPDEV;Database=Tyler;User Id=TSGMeridian;Password=alp;";
        string upsertQuery = @"
                            IF EXISTS (SELECT 1 FROM Items WHERE ID = @ID)
                                UPDATE Items SET LoanAmount = @LoanAmount WHERE ID = @ID
                            ELSE
                                INSERT INTO Items (ID, InterestRate, LenderName, LoanAmount, Term, LoanName) VALUES (@ID, @InterestRate, @LenderName, @LoanAmount, @Term, @LoanName)";

        using (SqlConnection connection = new SqlConnection(connectionString))
        using (SqlCommand command = new SqlCommand(upsertQuery, connection))
        {
          command.Parameters.AddWithValue("@ID", ID);
          data = data.Replace("{", "");
          data = data.Replace("}", "");
          string[] items = data.Split(',')
                  .Select(s => s.Trim())
                  .ToArray();
          foreach (var item in items)
          {
          // Split each item by the first colon to separate the key and valuei
            var result = item.Replace("\"", "");
            var colonIndex = result.IndexOf(':');
            command.Parameters.AddWithValue("@" + result.Substring(0, colonIndex), result.Substring(colonIndex + 1));
          }
  

          connection.Open();
          command.ExecuteNonQuery();
        }
      //}
    }

    public string Load(string ID)
    {
      // Update these values with your actual database information
      string connectionString = "Server=PLAPVSVODYDB10\\WEBAPPDEV;Database=Tyler;User Id=TSGMeridian;Password=alp;";
      string selectQuery = "SELECT Data FROM Items WHERE ID = @ID";
      using (SqlConnection connection = new SqlConnection(connectionString))
      using (SqlCommand command = new SqlCommand(selectQuery, connection))
      {
        command.Parameters.AddWithValue("@ID", ID);
        connection.Open();
        object result = command.ExecuteScalar();
        return result?.ToString();
      }
    }

    public void TestWrite(string test)
    {
      // Update these values with your actual database information
      string connectionString = "Server=PLAPVSVODYDB10\\WEBAPPDEV;Database=Tyler;User Id=TSGMeridian;Password=alp;";
      string insertQuery = "INSERT INTO Test (Test) VALUES (@TestValue)";

      using (SqlConnection connection = new SqlConnection(connectionString))
      using (SqlCommand command = new SqlCommand(insertQuery, connection))
      {
        command.Parameters.AddWithValue("@TestValue", test);

        connection.Open();
        command.ExecuteNonQuery();
      }
    }

    public void SaveLog(string ID, string data)
    {
      string connectionString = "Server=PLAPVSVODYDB10\\WEBAPPDEV;Database=Tyler;User Id=TSGMeridian;Password=alp;";
      //string upsertQuery = @"
      //                      IF EXISTS (SELECT 1 FROM Items WHERE ID = @ID)
      //                          UPDATE Items SET Data = @Data WHERE ID = @ID
      //                      ELSE
      //                          INSERT INTO Items (ID, Data) VALUES (@ID, @Data)";
      string upsertQuery = @"INSERT INTO Items (ID, Data) VALUES (@ID, @Data)";


      using (SqlConnection connection = new SqlConnection(connectionString))
      using (SqlCommand command = new SqlCommand(upsertQuery, connection))
      {
        command.Parameters.AddWithValue("@ID", ID);
        command.Parameters.AddWithValue("@Data", data);

        connection.Open();
        command.ExecuteNonQuery();
      }
    }

    public string RetrieveAllLoanInformation() 
    {
      //return "hiya";
      string connectionString = "Server=PLAPVSVODYDB10\\WEBAPPDEV;Database=Tyler;User Id=TSGMeridian;Password=alp;";
      //string selectQuery = "SELECT * FROM Items WHERE ID LIKE 'msg_1753819967038_mnxx86ty0'";
      string selectQuery = "SELECT * FROM Items";
      var loans = new List<Dictionary<string, object>>();
      //SaveLog("Test", "retrivingloan");

      using (SqlConnection connection = new SqlConnection(connectionString))
      {
        using (SqlCommand command = new SqlCommand(selectQuery, connection))
        {
          connection.Open();
          //object result = command.ExecuteScalar();
          //return JsonSerializer.Serialize(result);
          //string json = "{\"result\":\"" + result + "\"}";
          //return json;
          using (SqlDataReader reader = command.ExecuteReader())
          {
              while (reader.Read())
              {
                  var loan = new Dictionary<string, object>();
              loan["LoanName"] = reader["LoanName"];
              loan["LoanAmount"] = reader["LoanAmount"];
              loan["InterestRate"] = reader["InterestRate"];
              loan["ID"] = reader["ID"];
              loans.Add(loan);
            }
          }
        }
      }

      // Convert the list of loan names to JSON
      //return "hiya";
      //Response.ContentType = "application/json";
      string json = new JavaScriptSerializer().Serialize(loans);
      //Response.Write(json);
      return json;
      //Response.End();
    }
  }
}
