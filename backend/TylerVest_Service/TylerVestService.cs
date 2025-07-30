using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace TylerVest_Service
{
  public class TylerVestService
  {
    public void Save(string ID, string data)
    {
      string connectionString = "Server=PLAPVSVODYDB10\\WEBAPPDEV;Database=Tyler;User Id=TSGMeridian;Password=alp;";
      string upsertQuery = @"
                            IF EXISTS (SELECT 1 FROM Items WHERE ID = @ID)
                                UPDATE Items SET Data = @Data WHERE ID = @ID
                            ELSE
                                INSERT INTO Items (ID, Data) VALUES (@ID, @Data)";

      using (SqlConnection connection = new SqlConnection(connectionString))
      using (SqlCommand command = new SqlCommand(upsertQuery, connection))
      {
        command.Parameters.AddWithValue("@ID", ID);
        command.Parameters.AddWithValue("@Data", data);

        connection.Open();
        command.ExecuteNonQuery();
      }
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

    public void RetrieveLoanInformation() 
    {
      string connectionString = "Server=PLAPVSVODYDB10\\WEBAPPDEV;Database=Tyler;User Id=TSGMeridian;Password=alp;";
      string selectQuery = "SELECT LoanName FROM Items";
      var loanNames = new List<string>();

      using (SqlConnection connection = new SqlConnection(connectionString))
      using (SqlCommand command = new SqlCommand(selectQuery, connection))
      {
        connection.Open();
        using (SqlDataReader reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                loanNames.Add(reader["LoanName"].ToString());
            }
        }
      }

      // Convert the list of loan names to JSON
      return JsonSerializer.Serialize(loanNames);
    }
  }
}
