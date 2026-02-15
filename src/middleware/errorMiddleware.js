const errorHandler = (err, req, res) => {
  console.error("ERROR MIDDLEWARE:", err?.message || err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: err?.message || "Server Error",
  });
};

module.exports = errorHandler;