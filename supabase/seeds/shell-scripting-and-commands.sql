-- Run in Supabase SQL Editor to publish this study note.
insert into public.blog_posts (slug, title, excerpt, category, published_at, reading_minutes, body, published)
values (
  'shell-scripting-and-commands',
  'Shell scripting: the commands I’m learning first',
  'A field guide to navigating the terminal, inspecting systems, handling files safely, and writing my first Bash conditionals and loops.',
  'Learning notes',
  '2026-11-05',
  7,
  '# Shell scripting: the commands I’m learning first

Today I started building a foundation in the shell: moving around the filesystem, inspecting what is running, filtering text, and automating small tasks with Bash. These commands are useful because they let me work directly with the operating system and repeat routine work with scripts.

This is a learning note, not a complete reference. I’ve included a few corrections where a command is easy to misunderstand, especially when it can change or delete files.

## Finding my way around

| Command | What it does | Example |
| --- | --- | --- |
| `pwd` | Prints the current working directory. | `pwd` |
| `ls` | Lists files and directories. | `ls -la` includes hidden files and details. |
| `cd` | Changes the current directory. | `cd ~/Projects` |
| `mkdir` | Creates a directory. | `mkdir -p notes/week-1` creates missing parent folders too. |
| `touch` | Creates an empty file, or updates its timestamp if it exists. | `touch notes.md` |
| `man` | Opens a command’s manual page. | `man find` |

The shell expands `~` to my home directory. A relative path is interpreted from the directory shown by `pwd`; an absolute path starts from the filesystem root.

## Inspecting files and the machine

`find` searches for files by criteria. I can search the current project with:

```bash
find . -name ''notes.md''
```

Starting with `/` searches the whole filesystem and can take a long time or produce permission errors. It’s usually better to narrow the starting directory.

`top` shows changing process information, while `ps` prints a snapshot. For example, `ps aux` lists processes on many Unix-like systems. `nproc` reports the number of processing units available to a process on Linux; it may not be installed on macOS.

For storage and memory, `df -h` displays filesystem space in readable units. `free -g` reports memory in gigabytes on Linux, but it is not a standard macOS command. On macOS, `vm_stat` is one built-in way to inspect virtual memory statistics.

## Filtering text

`grep` finds lines containing a pattern:

```bash
grep -i ''error'' app.log
```

The `-i` option ignores letter case. `awk` is useful for selecting fields or processing rows. For whitespace-separated output, I can use:

```bash
ps aux | awk ''{print $1, $2}''
```

Here `$1` and `$2` mean the first and second fields. For simple comma-separated data, `-F'',''` sets the delimiter (it does not handle every quoted CSV edge case):

```bash
awk -F'','' ''{print $1}'' people.csv
```

Using `-F'' ''` only treats a literal space as the separator; it is not the best choice for irregular whitespace. By default, `awk` already splits on runs of whitespace.

A pipe (`|`) sends one command’s output to the next command. I can use it to combine tools, such as `ps aux | grep ''[n]ode''`. The bracket pattern helps avoid matching the `grep` command itself.

## Downloading and requesting data

`curl` and `wget` can both make web requests and download files. A useful distinction is their default behavior: `curl` writes response content to standard output unless told otherwise, while `wget` usually saves a downloaded file. Either tool can be configured for other behavior.

```bash
curl -o response.json https://example.com/data.json
wget https://example.com/archive.zip
```

The result depends on options and the server response, so I should check the command’s exit status and output instead of assuming a request succeeded.

## Bash scripts and error handling

A shebang tells the system which interpreter should run a script. This is a common Bash-friendly form:

```bash
#!/usr/bin/env bash
```

I can add strict-ish checks and command tracing near the top of a script:

```bash
set -euo pipefail
```

- `-e` asks Bash to exit when a command fails in many contexts. It has exceptions, so it does not replace deliberate error handling.
- `-u` treats references to unset variables as errors.
- `-o pipefail` makes a pipeline return a failure status if a command within it fails, rather than only reporting the status of the final command.

For temporary debugging, `set -x` prints commands as Bash runs them. I should turn it off with `set +x` when finished, and avoid tracing commands that include passwords, tokens, or other private values.

### A conditional

Bash conditionals use `if`, `then`, and `fi`:

```bash
#!/usr/bin/env bash

file="notes.md"

if [[ -f "$file" ]]; then
  echo "Found $file"
else
  echo "Could not find $file"
fi
```

The `[[ ... ]]` form is a Bash feature. Quoting `"$file"` keeps paths with spaces together as one value.

### A loop

Brace expansion can generate a sequence for a simple loop:

```bash
for i in {1..5}; do
  echo "$i"
done
```

This is Bash syntax, not Python’s `range()` syntax. For a sequence controlled by a variable, Bash arithmetic loops are another option:

```bash
for ((i = 1; i <= 5; i++)); do
  echo "$i"
done
```

## Permissions and elevated access

`chmod` changes file permissions. The numeric values add together: `4` is read, `2` is write, and `1` is execute. For example:

```bash
chmod 750 deploy.sh
```

This gives the owner read, write, and execute permissions; the group read and execute; and everyone else no permissions. `chmod 777` gives everyone read, write, and execute access, which is usually broader access than a script needs. I should choose the smallest permissions that let the intended users do their job.

`sudo` runs a command with elevated privileges when my account is allowed to do so:

```bash
sudo command-name
```

To run a command as another user, `sudo -u username command-name` is the usual form. `sudo su -` opens a root login shell on many systems, but I should prefer running only the specific command that needs elevated access.

## Removing files and handling signals

`rm -r directory` removes a directory and its contents recursively. `rm -rf path` also forces removal without many prompts. These commands can delete important data, and recursive deletion does not move items to a recycle bin. I should verify the path before running them, especially in scripts or when using variables.

`kill PID` sends a signal to a process; by default it asks the process to terminate. It does not necessarily kill the process immediately. `kill -9 PID` sends a forceful signal that the process cannot handle, so it is a last resort after a normal termination request fails.

A `trap` lets a script respond to signals or run cleanup when it exits. For example, pressing Ctrl+C usually sends `SIGINT`:

```bash
trap ''echo "Interrupted"; exit 130'' INT
```

The quoted commands run when Bash receives `INT`. A trap can also remove temporary files during cleanup.

## What I’m taking away

The terminal gives me small, composable tools: one command finds files, another filters output, and a script connects the steps. The same power makes careful quoting, narrow permissions, and checking destructive commands important habits.

My next step is to practise these commands in a temporary project directory and write a short script that checks for a file before processing it.

## References

- [GNU Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [GNU Coreutils manual](https://www.gnu.org/software/coreutils/manual/coreutils.html)
- [curl manual](https://curl.se/docs/manpage.html)
- [GNU Wget manual](https://www.gnu.org/software/wget/manual/wget.html)',
  true
)
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  category = excluded.category,
  published_at = excluded.published_at,
  reading_minutes = excluded.reading_minutes,
  body = excluded.body,
  published = excluded.published,
  updated_at = now();
