module.exports = (schedule, toCronString, Job) => {
  const key = ({ team_id, event_id }) => {
    return `${team_id}-${event_id}`;
  };

  const add = events => {
    events.forEach(({ team_id, event_id, frequency, time }) => {
      // event: { team_id, event_id, frequency, time: { hh, mm } }
      const eventKey = key({ team_id, event_id });
      const cronString = toCronString({ frequency, time });
      const job = Job(team_id, event_id);
      schedule.scheduleJob(eventKey, cronString, job);
    });
  };

  const cancel = events => {
    events.forEach(({ team_id, event_id }) => {
      const eventKey = key({ team_id, event_id });
      schedule.cancel(eventKey);
    });
  };

  const reschedule = events => {
    cancel(events);
    add(events);
  };

  return { add, cancel, reschedule };
};
