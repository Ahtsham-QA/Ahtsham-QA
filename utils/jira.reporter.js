const { createJiraBug } = require('./jira.helper');

class JiraReporter {
  onBegin(config, suite) {
    console.log(`🚀 Starting test run with ${suite.allTests().length} tests`);
  }

  async onTestEnd(test, result) {
    if (result.status === 'failed') {
      const errorMessage = result.error?.message || 'No error message captured';
      const testTitle = test.title;
      const testFile = test.location.file.split('/').pop();

      console.log(`❌ Test failed: ${testTitle} — logging to Jira`);

      try {
        await createJiraBug({
          summary: `[Auto] Test Failed: ${testTitle}`,
          description: `Test file: ${testFile}
Test name: ${testTitle}
Error: ${errorMessage}
Status: ${result.status}
Duration: ${result.duration}ms`,
          priority: 'High',
        });
      } catch (error) {
        console.log('⚠️ Jira logging failed in CI — skipping');
      }
    }
  }

  onEnd(result) {
    console.log(`✅ Test run finished with status: ${result.status}`);
  }
}

module.exports = JiraReporter;
