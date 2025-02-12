type DatabaseConstraintError = {
  type: 'unique' | 'check' | 'not null' | 'foreign key' | 'unknown';
  columnName?: string;
  message?: string;
};

type AuthRequest = {
  username: string;
  password: string;
};

type LinkRequest = {
  originalUrl: string;
};

type LinkIdParam = {
  linkId: string;
};

type userIdParam = {
  userId: string;
};
