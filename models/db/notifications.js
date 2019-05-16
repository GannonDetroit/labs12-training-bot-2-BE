const db = require("../index");

module.exports = {
  add,
  find,
  update,
  remove
};

/**
 * Adds a new Notification to the database, and then returns the newly created
 * Notification
 *
 * @function
 * @param  {Object} message - A Message object
 * @returns {Promise} Promise that resolves to the new message Object
 */
function add(notification) {
  return db("notifications")
    .insert(notification, ["*"])
    .then(n => find({ "n.id": n[0].id }).first());
}

/**
 * Finds a particular Notification or set of Notifications based on the key/
 * value pairs contained within the filter object parameter.
 *
 * @param  {Object} filters - A filter object to be passed to the "where" clause
 * @returns {Promise} Promise that resolves to an array of found Message objects
 */
function find(filters) {
  return db("notifications AS n")
    .select(
      "n.id",
      "n.send_date",
      "n.is_sent",
      "n.num_attempts",
      "n.thread",
      "ts.id AS training_series_id",
      "ts.title AS series",
      "tm.id AS team_member_id",
      "tm.first_name",
      "tm.last_name",
      "tm.email",
      "tm.phone_number",
      "tm.slack_uuid",
      "m.subject",
      "m.body",
      "m.link",
      "u.email AS user",
      "s.name"
    )
    .leftJoin("messages AS m", { "m.id": "n.message_id" })
    .leftJoin("services AS s", { "s.id": "n.service_id" })
    .leftJoin("team_members AS tm", { "tm.id": "n.team_member_id" })
    .leftJoin("users AS u", { "u.id": "tm.user_id" })
    .leftJoin("training_series AS ts", { "ts.id": "m.training_series_id" })
    .where(filters)
    .orderBy("n.send_date");
}

/**
 * Updates a Notification or set of Notifications based on the key/value pairs
 * contained within the filter object parameter.
 *
 * @param  {Object} filter - A filter object to be passed to the "where" clause
 * @param  {Object} changes - An object containing the changes you'd like to make to the Message(s) selected by the filter object
 * @returns {Promise}
 */
function update(filter, changes) {
  return db("notifications AS n")
    .update(changes, ["*"])
    .where(filter);
}

/**
 * Deletes a single Notification or set of Notifications based on the key/value
 * pairs contained within the filter object parameter.
 *
 * @param  {Object} filter - A filter object to be passed to the "where" clause
 * @returns {Promise} A Promise that resolves to the number of Notifications deleted
 */
function remove(filters) {
  return db("notifications AS n")
    .leftJoin("team_members AS tm", { "tm.id": "n.team_member_id" })
    .leftJoin("users AS u", { "u.id": "tm.user_id" })
    .where(filters)
    .del();
}
