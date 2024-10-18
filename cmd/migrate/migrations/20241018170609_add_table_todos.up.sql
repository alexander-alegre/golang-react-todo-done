CREATE TABLE IF NOT EXISTS todos(
    id serial primary key,
    task text,
    deleted boolean not null default 'false',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    deleted_at timestamp
)
