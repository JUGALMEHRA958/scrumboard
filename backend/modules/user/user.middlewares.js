import assert from 'assert';

 function registerMiddleware(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Basic validations using Node assert
    assert(name, 'Name is required');
    assert(typeof name === 'string', 'Name must be a string');
    assert(name.length >= 3, 'Name must be at least 3 characters');

    assert(email, 'Email is required');
    assert(typeof email === 'string', 'Email must be a string');
    assert(email.match(/.+\@.+\..+/), 'Invalid email format');

    assert(password, 'Password is required');
    assert(typeof password === 'string', 'Password must be a string');
    assert(password.length >= 6, 'Password must be at least 6 characters');

    // All good, move forward
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}



export { registerMiddleware}