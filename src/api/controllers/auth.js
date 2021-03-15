const catchAsyncError = require('../../helpers/catchAsyncError');
const AuthService = require('../../services/auth');
const { generatePassword } = require('../../helpers');

exports.signup = catchAsyncError(async (request, response) => {
  const userData = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
  };

  // get base url
  const url = `${request.protocol}://${request.get('host')}`;

  // send user data to authService for signing up
  const { accessToken, refreshToken } = await AuthService.userSignup(
    { ...userData, password: generatePassword() },
    url,
  );

  const coookieOptions = {
    httpOnly: true,
  };

  // return response
  response.cookie('okrCookie', refreshToken, coookieOptions);
  return response.status(201).json({
    status: 'success',
    data: {
      accessToken,
    },
  });
});

exports.login = catchAsyncError(async (request, response) => {
  const { email, password } = request.body;
  const userData = { email, password };

  const { accessToken, refreshToken } = await AuthService.userLogin(userData);

  return response.status(201).json({
    status: 'success',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// exports.handleLogout = catchAsyncError(async (request, response) => {
//   const referer =
//     stringIsAValidUrl(request.query.redirectUrl || request.get('referer')) || BASE_DOMAIN;
//   const accessToken = request.query.access_token || request.cookies.access_token;
//   const refreshToken = request.query.refresh_token || request.cookies.refresh_token;
//   const cookieDomain = getBaseDomainFromUrl(referer); // including all subDomain

//   const userData = { accessToken, refreshToken };

//   const response = await AuthService.userLogout(userData);

//   if (!!accessToken && !!refreshToken) {
//     try {
//       JWTHelper.removeTokenFromRefereshList(refreshToken);
//       response.clearCookie('access_token', { domain: cookieDomain });
//       response.clearCookie('refresh_token', { domain: cookieDomain });
//       response.redirect(referer);
//     } catch (e) {
//       response.status(500).send(e.stack);
//     }
//   } else {
//     response.redirect(referer);
//   }
// });

exports.renewAccessToken = catchAsyncError(async (request, response) => {
  const oldToken = request.body.access_token;
  const refreshToken = request.body.refresh_token;

  const { access, refresh } = await AuthService.renewAccessToken({ oldToken, refreshToken });

  return response.status(200).json({
    status: 'success',
    data: {
      refreshToken: refresh,
      accessToken: access,
    },
  });
});

exports.forgotPassword = catchAsyncError(async (request, response) => {
  const { email } = request.body;
  const url = `${request.protocol}://${request.get('host')}/api/v1/users/resetPassword`;

  await AuthService.forgotPassword(email, url);

  return response.status(200).json({
    status: 'success',
    message: 'Token sent to email',
  });
});

exports.resetPassword = catchAsyncError(async (request, response) => {
  const { token } = request.params;
  const { password } = request.body;

  const user = await AuthService.resetPassword(token, password);

  return response.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.updatePassword = catchAsyncError(async (request, response) => {
  // Get user from the collection
  const { currentPassword, newPassword } = request.body;
  const userData = {
    currentPassword,
    newPassword,
    userId: request.user.id,
  };

  const user = await AuthService.updatePassword(userData);

  // Log user in, send jwt
  return response.status(200).json({
    status: 'success',
    data: { user },
  });
});
