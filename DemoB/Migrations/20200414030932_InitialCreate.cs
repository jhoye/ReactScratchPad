using System;
using DemoB.Models;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DemoB.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EntityTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ValueTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ValueTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Entities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityTypeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Entities_EntityTypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EntityTypeRelationships",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    IsHasManyRelationship = table.Column<bool>(nullable: false),
                    EntityTypeId = table.Column<Guid>(nullable: false),
                    RelatedEntityTypeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityTypeRelationships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityTypeRelationships_EntityTypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EntityTypeRelationships_EntityTypes_RelatedEntityTypeId",
                        column: x => x.RelatedEntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EntityTypeAttributes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    IsNullable = table.Column<bool>(nullable: false),
                    IsUnique = table.Column<bool>(nullable: false),
                    EntityTypeId = table.Column<Guid>(nullable: false),
                    ValueTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityTypeAttributes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntityTypeAttributes_EntityTypes_EntityTypeId",
                        column: x => x.EntityTypeId,
                        principalTable: "EntityTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EntityTypeAttributes_ValueTypes_ValueTypeId",
                        column: x => x.ValueTypeId,
                        principalTable: "ValueTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Relationships",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityId = table.Column<Guid>(nullable: false),
                    RelatedEntityId = table.Column<Guid>(nullable: false),
                    EntityTypeRelationshipId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relationships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Relationships_Entities_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Relationships_EntityTypeRelationships_EntityTypeRelationshipId",
                        column: x => x.EntityTypeRelationshipId,
                        principalTable: "EntityTypeRelationships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Relationships_Entities_RelatedEntityId",
                        column: x => x.RelatedEntityId,
                        principalTable: "Entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attributes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EntityId = table.Column<Guid>(nullable: false),
                    EntityTypeAttributeId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attributes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attributes_Entities_EntityId",
                        column: x => x.EntityId,
                        principalTable: "Entities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Attributes_EntityTypeAttributes_EntityTypeAttributeId",
                        column: x => x.EntityTypeAttributeId,
                        principalTable: "EntityTypeAttributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttributeBooleanValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AttributeId = table.Column<Guid>(nullable: false),
                    Value = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeBooleanValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttributeBooleanValues_Attributes_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttributeDateTimeValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AttributeId = table.Column<Guid>(nullable: false),
                    Value = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeDateTimeValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttributeDateTimeValues_Attributes_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttributeDecimalValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AttributeId = table.Column<Guid>(nullable: false),
                    Value = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeDecimalValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttributeDecimalValues_Attributes_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttributeIntegerValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AttributeId = table.Column<Guid>(nullable: false),
                    Value = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeIntegerValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttributeIntegerValues_Attributes_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AttributeTextValues",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AttributeId = table.Column<Guid>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeTextValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttributeTextValues_Attributes_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttributeBooleanValues_AttributeId",
                table: "AttributeBooleanValues",
                column: "AttributeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeDateTimeValues_AttributeId",
                table: "AttributeDateTimeValues",
                column: "AttributeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeDecimalValues_AttributeId",
                table: "AttributeDecimalValues",
                column: "AttributeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeIntegerValues_AttributeId",
                table: "AttributeIntegerValues",
                column: "AttributeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attributes_EntityId",
                table: "Attributes",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Attributes_EntityTypeAttributeId",
                table: "Attributes",
                column: "EntityTypeAttributeId");

            migrationBuilder.CreateIndex(
                name: "IX_AttributeTextValues_AttributeId",
                table: "AttributeTextValues",
                column: "AttributeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Entities_EntityTypeId",
                table: "Entities",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeAttributes_EntityTypeId",
                table: "EntityTypeAttributes",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeAttributes_ValueTypeId",
                table: "EntityTypeAttributes",
                column: "ValueTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeRelationships_EntityTypeId",
                table: "EntityTypeRelationships",
                column: "EntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EntityTypeRelationships_RelatedEntityTypeId",
                table: "EntityTypeRelationships",
                column: "RelatedEntityTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Relationships_EntityId",
                table: "Relationships",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_Relationships_EntityTypeRelationshipId",
                table: "Relationships",
                column: "EntityTypeRelationshipId");

            migrationBuilder.CreateIndex(
                name: "IX_Relationships_RelatedEntityId",
                table: "Relationships",
                column: "RelatedEntityId");

            // Insert seed data.
            foreach (var valueType in Enum.GetValues(typeof(ValueTypes)))
            {
                migrationBuilder.InsertData(
                    "ValueTypes",
                    new[] { "Id", "Name" },
                    new[] { (object)(int)valueType, valueType.ToString() });
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttributeBooleanValues");

            migrationBuilder.DropTable(
                name: "AttributeDateTimeValues");

            migrationBuilder.DropTable(
                name: "AttributeDecimalValues");

            migrationBuilder.DropTable(
                name: "AttributeIntegerValues");

            migrationBuilder.DropTable(
                name: "AttributeTextValues");

            migrationBuilder.DropTable(
                name: "Relationships");

            migrationBuilder.DropTable(
                name: "Attributes");

            migrationBuilder.DropTable(
                name: "EntityTypeRelationships");

            migrationBuilder.DropTable(
                name: "Entities");

            migrationBuilder.DropTable(
                name: "EntityTypeAttributes");

            migrationBuilder.DropTable(
                name: "EntityTypes");

            migrationBuilder.DropTable(
                name: "ValueTypes");
        }
    }
}
