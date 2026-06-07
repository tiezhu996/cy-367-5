CREATE TABLE IF NOT EXISTS operation_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_name VARCHAR(120) NOT NULL,
  owner_name VARCHAR(80) NOT NULL,
  status VARCHAR(40) NOT NULL,
  metric VARCHAR(40) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO operation_records (module_name, owner_name, status, metric)
VALUES ('座位热力图可视化', '运营组', 'ready', '100%');

CREATE TABLE IF NOT EXISTS blacklist (
  id VARCHAR(40) PRIMARY KEY,
  user_name VARCHAR(80) NOT NULL,
  user_id VARCHAR(40) NOT NULL,
  violation_count INT NOT NULL DEFAULT 0,
  ban_time DATETIME NOT NULL,
  unban_time DATETIME NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'banned',
  reason VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);

INSERT INTO blacklist (id, user_name, user_id, violation_count, ban_time, unban_time, status, reason) VALUES
('blacklist-1', '张伟', 'U10001', 3, '2026-06-01 14:30:00', '2026-06-15 14:30:00', 'banned', '预约后未签到'),
('blacklist-2', '李娜', 'U10023', 5, '2026-05-20 09:15:00', '2026-07-20 09:15:00', 'banned', '多次提前离场'),
('blacklist-3', '王芳', 'U10045', 2, '2026-06-05 16:45:00', '2026-06-12 16:45:00', 'banned', '损坏设施'),
('blacklist-4', '刘强', 'U10067', 8, '2026-04-10 11:00:00', NULL, 'permanent', '严重违规屡教不改');
