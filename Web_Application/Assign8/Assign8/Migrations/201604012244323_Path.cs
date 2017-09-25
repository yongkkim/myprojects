namespace Assign8.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Path : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tracks", "Path", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tracks", "Path");
        }
    }
}
