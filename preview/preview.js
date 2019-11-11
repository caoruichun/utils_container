const { run } = require('runjs')
const chalk = require('chalk')
const config = require('./vue.config')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')
console.log(chalk.red(args))
const connect = require('connect')
const serveStatic = require('serve-static')

if (rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report')
  console.log(chalk.green(report))
  run(`vue-cli-service build ${args}`)

  const port = 9991
  const publicPath = config.publicPath
  const app = connect()
  app.use(publicPath, serveStatic('./dist', {
    index: ['index.html', '/']
  }))
  app.listen(port, function () {
    console.log(chalk.blue(`> preview at http://localhost:${port}${publicPath}`))
    if (report) {
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
    }
  })
} else {
  run(`vue-cli-service build ${args}`)
}
