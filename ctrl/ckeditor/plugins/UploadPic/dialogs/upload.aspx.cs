using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;
public partial class fckeditor_editor_plugins_upload_upload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
		
	
        if (Request.Files.Count > 0)
        {
            string filename = DateTime.Now.ToString("yyyyMMddmmss");
            HttpPostedFile file = HttpContext.Current.Request.Files[0];
            if (file.ContentLength > 0)
            {
                string exection = EnHtml1(HttpUtility.UrlDecode(file.FileName, Encoding.GetEncoding("GB2312"))).Substring(EnHtml1(HttpUtility.UrlDecode(file.FileName, Encoding.GetEncoding("GB2312"))).Length - 3); 
 
                string fileurl = filename +"."+ exection;
                file.SaveAs(HttpContext.Current.Server.MapPath("/upfile/" + fileurl));
                Response.Write("<script language=\"javascript\">");
				
				//Response.Write("var editor = CKEDITOR.instances.FContent;"); 
				Response.Write("var html = \"<div><img src=/upfile/" + fileurl + " border=0 /></div>\";");
				//Response.Write("editor.insertHtml(html);");
				Response.Write(" window.parent.InsertHTML(html);"); 
				//Response.Write("CKEDITOR.dialog.cancelButton.Cancel(); ");
                Response.Write("</script>");
            }
        }
    }

    public static string EnHtml1(string str)
    {
        if (str == null)
            return "";
        str = str.Replace(" ", "");

        str = str.Trim();
        return str;
    }
}
