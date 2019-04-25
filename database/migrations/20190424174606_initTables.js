exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("accountType", tbl => {
      tbl.increments("accountTypeID");
      tbl.text("accountType");
      tbl.integer("maxNotificationCount");
    })
    .createTable("User", tbl => {
      tbl.increments("userID");
      tbl.text("name");
      tbl.text("email");
      tbl
        .integer("accountTypeID")
        .references("accountTypeID")
        .inTable("accountType")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("TrainingSeries", tbl => {
      tbl.increments("trainingSeriesID");
      tbl.text("title");
      tbl
        .integer("userID")
        .references("userID")
        .inTable("User")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("TeamMember", tbl => {
      tbl.increments("teamMemberID");
      tbl.text("firstName");
      tbl.text("lastName");
      tbl.text("jobDescription");
      tbl.text("email");
      tbl.text("phoneNumber");
      tbl.text("slackID");
      tbl.text("teamsID");
      tbl
        .integer("user_ID")
        .references("userID")
        .inTable("User")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("RelationalTable", tbl => {
      tbl.increments("relationTableID");
      tbl.date("startDate");
      tbl
        .integer("teamMember_ID")
        .references("teamMemberID")
        .inTable("TeamMember")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("trainingSeries_ID")
        .references("trainingSeriesID")
        .inTable("TrainingSeries")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("Post", tbl => {
      tbl.increments("postID");
      tbl.text("postName");
      tbl.text("postDetails");
      tbl.text("link");
      tbl.integer("daysFromStart");
      tbl.text("postImage");
      tbl
        .integer("trainingSeriesID")
        .references("trainingSeriesID")
        .inTable("TrainingSeries")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("Post")
    .dropTableIfExists("RelationalTable")
    .dropTableIfExists("TeamMember")
    .dropTableIfExists("TrainingSeries")
    .dropTableIfExists("User")
    .dropTableIfExists("accountType");
};
