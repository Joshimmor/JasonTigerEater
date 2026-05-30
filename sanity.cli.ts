/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { config as loadEnv } from 'dotenv'
import { defineCliConfig } from 'sanity/cli'

loadEnv({ path: '.env.local' })

const projectId = "qcokrzt4"
const dataset = "production"
export default defineCliConfig({ api: { projectId, dataset } })
