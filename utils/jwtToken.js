export const sendToken = (user, res) => {
    const token = user.getJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000  // expires 1 day
      ),
      httpOnly: true, // cannot be read by js, http only
      sameSite: true, // cannot be used by other sites
    };
    
    // REMOVE???
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
  
    res
      .status(200)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        user: {
          email: user.email,
          name: user.name,
          role: user.role, 
        },
      });
  };
  