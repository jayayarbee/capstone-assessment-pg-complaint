PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS residents;


CREATE TABLE residents (
    resident_id   INTEGER PRIMARY KEY,
    resident_name TEXT NOT NULL,
    room_number   TEXT NOT NULL,
    contact_info  TEXT NOT NULL
);

CREATE TABLE complaints (
    complaint_id     INTEGER PRIMARY KEY,
    resident_id      INTEGER NOT NULL,
    category         TEXT NOT NULL CHECK (category IN
                        ('Electricity','Plumbing','Water Supply','Internet',
                         'Housekeeping','Maintenance','Other')),
    description      TEXT NOT NULL,
    priority         TEXT NOT NULL CHECK (priority IN
                        ('Low','Medium','High','Urgent')),
    status           TEXT NOT NULL DEFAULT 'Open' CHECK (status IN
                        ('Open','In Progress','Resolved','Cancelled')),
    date_submitted   TEXT NOT NULL DEFAULT (date('now')),
    additional_info  TEXT,
    FOREIGN KEY (resident_id) REFERENCES residents(resident_id)
);



INSERT INTO residents (resident_id, resident_name, room_number, contact_info)
VALUES (1, 'Priya Shetty', 'B-204', '9876543210');

INSERT INTO residents (resident_id, resident_name, room_number, contact_info)
VALUES (2, 'Arjun Rao', 'A-101', 'arjun.rao@example.com');

INSERT INTO complaints (
  complaint_id, resident_id, category, description, priority, status, additional_info
)
VALUES (
  1, 1, 'Electricity', 'Power socket in the kitchen is not working', 'High', 'Open', 'Sparks seen once'
);

INSERT INTO complaints (
  complaint_id, resident_id, category, description, priority, status, additional_info
)
VALUES (
  2, 2, 'Plumbing', 'Bathroom tap is leaking continuously', 'Medium', 'In Progress', NULL
);



SELECT name FROM sqlite_master WHERE type = 'table';

SELECT
  c.complaint_id,
  r.resident_name,
  r.room_number,
  c.category,
  c.priority,
  c.status,
  c.date_submitted
FROM complaints c
JOIN residents r ON r.resident_id = c.resident_id;



UPDATE complaints
SET status = 'Resolved'
WHERE complaint_id = 2;


UPDATE complaints
SET priority = 'Urgent',
    description = 'Power socket sparked again, needs urgent attention'
WHERE complaint_id = 1;




DELETE FROM complaints
WHERE complaint_id = 2;



SELECT * FROM complaints;
SELECT * FROM residents;
