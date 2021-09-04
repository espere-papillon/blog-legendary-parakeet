const contentfulManagement = require("contentful-management")

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT--d3GKwkSBGYbS8vfqCleDXr8koq8F6BTpmWPp_o_4KA',
  })

  return contentfulClient
    .getSpace('lwrn12tt4l7a')
    .then(space => space.getEnvironment('master'))
}