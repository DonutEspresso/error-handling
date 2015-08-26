
# Ensuring throws on unexpected errors
`npm install` first to get all dependencies. Then run `npm test` to run the
unit tests for error handling.  The unit tests are setup to to run each file as
a separate process, and poll the exit code to ensure that errors were either
thrown or captured correctly. Callbacks always throw, and Observables appear to
do the same as well. Promises fail in a couple of scenarios, and they are
highlighted by failures in the unit tests.


# Capturing relevant stack traces
I've also attached two scripts which introduce a common scenario for building
relevant and contextual stack traces in the event of expected errors. There's
currently a callback and promise implementation, no observable implementation
yet. The scripts are fairly simple:

1. First, fake getting an async value (setTimeout).
2. Second, validate it.
3. Log the value.

During step 1 and 2, `Math.random()` is used to trigger both expected and
unexpected error. If expected errors occur, they are logged. If unexpected
errors occur, the script should crash. I recommend running the below commands
back to back to see all the possible variations of success/failure cases:

1. Failed network call.
2. Failed network call, failed validation.
3. Successful network call, failed validation.
4. Successful network call, silently failed validation (promise version only).
5. Successful network call, successful validation.

The script aims to demonstrate that error handling in Promises are opt-in (by
nature of error handlers being optional), but worse yet is that `throw` in the
error handler does not cause the the process to crash. Instead, the error is
swallowed. This means it is not possible to actually crash on unexpected errors
unless we force it by calling `process.exit(1);`, which is less than ideal.
Additionally, if error handlers attempt to do complex things before crashing
the process, it may never reach said `process.exit`, which will cause the app
to continue running in a possibly bad state.

To test the callback version, `npm run st-cb`

To test the promise version, `npm run st-promise`

To test the observable version, `TODO`





