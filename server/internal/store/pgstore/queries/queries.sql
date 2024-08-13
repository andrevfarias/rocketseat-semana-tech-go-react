-- name: GetRoom :one
SELECT 
  "id", "theme" 
FROM rooms 
WHERE id = $1
LIMIT 1;

-- name: GetRooms :many
SELECT 
  "id", "theme" 
FROM rooms;

-- name: InsertRoom :one
INSERT INTO rooms 
  ( "theme" ) VALUES 
  ( $1 )
RETURNING "id";

-- name: GetMessage :one
SELECT
  "id",
  "room_id",
  "message",
  "reaction_count",
  "answered"
FROM messages
WHERE 
  id = $1
LIMIT 1;

-- name: GetRoomMessages :many
SELECT
  "id",
  "room_id",
  "message",
  "reaction_count",
  "answered"
FROM messages
WHERE 
  room_id = $1
ORDER BY "id" DESC;

-- name: InsertMessage :one
INSERT INTO messages
  ( "room_id", "message" ) VALUES
  ( $1, $2 )
RETURNING "id";

-- name: ReactToMessage :one
UPDATE messages
SET
  "reaction_count" = "reaction_count" + 1
WHERE
  "id" = $1
RETURNING "reaction_count";

-- name: RemoveReactionFromMessage :one
UPDATE messages
SET
  "reaction_count" = GREATEST("reaction_count" - 1, 0)
WHERE
  "id" = $1
RETURNING "reaction_count";

-- name: MarkMessageAsAnswered :exec
UPDATE messages
SET
  "answered" = true
WHERE
  "id" = $1;