import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import './test-framework';

const PATCHED_VSCODE_DIR = join(process.cwd(), 'code-editor-src');

describe('sagemaker-extension.diff validation', () => {
  test('sagemaker-extension should have main extension.ts with required imports', () => {
    const filePath = join(PATCHED_VSCODE_DIR, 'extensions/sagemaker-extension/src/extension.ts');
    
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const content = readFileSync(filePath, 'utf8');
    
    // Check for SessionWarning import
    const sessionWarningImport = 'import { SessionWarning } from "./sessionWarning";';
    if (!content.includes(sessionWarningImport)) {
      throw new Error(`Expected SessionWarning import not found in ${filePath}`);
    }

    // Check for constants import
    const constantsImport = 'SAGEMAKER_METADATA_PATH,';
    if (!content.includes(constantsImport)) {
      throw new Error(`Expected constants import not found in ${filePath}`);
    }

    // Check for command constants
    const parseCommand = "const PARSE_SAGEMAKER_COOKIE_COMMAND = 'sagemaker.parseCookies';";
    if (!content.includes(parseCommand)) {
      throw new Error(`Expected parse cookie command not found in ${filePath}`);
    }

    // Check for showWarningDialog function
    const warningFunction = 'function showWarningDialog() {';
    if (!content.includes(warningFunction)) {
      throw new Error(`Expected showWarningDialog function not found in ${filePath}`);
    }
    
    console.log('PASS: SageMaker extension main file has required content');
  });

  test('sagemaker-extension should have package.json with correct configuration', () => {
    const filePath = join(PATCHED_VSCODE_DIR, 'extensions/sagemaker-extension/package.json');
    
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const content = readFileSync(filePath, 'utf8');
    const packageJson = JSON.parse(content);
    
    if (packageJson.name !== 'sagemaker-extension') {
      throw new Error(`Expected extension name 'sagemaker-extension', got: ${packageJson.name}`);
    }
    
    console.log('PASS: SageMaker extension package.json is valid');
  });

  test('constant.ts should have capacity block notification constants', () => {
      const filePath = join(PATCHED_VSCODE_DIR, 'extensions/sagemaker-extension/src/constant.ts');
      
      if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const content = readFileSync(filePath, 'utf8');
      
      // Check for time interval constants
      if (!content.includes('export const THIRTY_MINUTES_INTERVAL_MILLIS')) {
        throw new Error(`Expected THIRTY_MINUTES_INTERVAL_MILLIS constant not found in ${filePath}`);
      }
  
      if (!content.includes('export const TEN_MINUTES_INTERVAL_MILLIS')) {
        throw new Error(`Expected TEN_MINUTES_INTERVAL_MILLIS constant not found in ${filePath}`);
      }
  
      if (!content.includes('export const TWO_MINUTES_INTERVAL_MILLIS')) {
        throw new Error(`Expected TWO_MINUTES_INTERVAL_MILLIS constant not found in ${filePath}`);
      }
  
      // Check for internal metadata path
      if (!content.includes("export const SAGEMAKER_INTERNAL_METADATA_PATH = '/opt/.sagemakerinternal/internal-metadata.json'")) {
        throw new Error(`Expected SAGEMAKER_INTERNAL_METADATA_PATH constant not found in ${filePath}`);
      }
  
      // Check for warning message constants
      if (!content.includes("export const CB_WARNING_TOAST_HEADER = 'Capacity Block Expiring Soon'")) {
        throw new Error(`Expected CB_WARNING_TOAST_HEADER constant not found in ${filePath}`);
      }
  
      // Check for CapacityBlockMetadata interface
      if (!content.includes('export interface CapacityBlockMetadata')) {
        throw new Error(`Expected CapacityBlockMetadata interface not found in ${filePath}`);
      }
  
      // Check for SagemakerResourceInternalMetadata interface
      if (!content.includes('export interface SagemakerResourceInternalMetadata')) {
        throw new Error(`Expected SagemakerResourceInternalMetadata interface not found in ${filePath}`);
      }
      
      console.log('PASS: Capacity block notification constants found in constant.ts');
    });
  
    test('extension.ts should have capacity block monitoring initialization', () => {
      const filePath = join(PATCHED_VSCODE_DIR, 'extensions/sagemaker-extension/src/extension.ts');
      
      if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const content = readFileSync(filePath, 'utf8');
      
      // Check for capacityBlockWarning import
      if (!content.includes("from './capacityBlockWarning'")) {
        throw new Error(`Expected capacityBlockWarning import not found in ${filePath}`);
      }
  
      // Check for CB timeout variables
      if (!content.includes('let cbTimeout30: NodeJS.Timeout | null = null')) {
        throw new Error(`Expected cbTimeout30 variable not found in ${filePath}`);
      }
  
      // Check for initializeCapacityBlockMonitoring function
      if (!content.includes('function initializeCapacityBlockMonitoring()')) {
        throw new Error(`Expected initializeCapacityBlockMonitoring function not found in ${filePath}`);
      }
  
      // Check for scheduleCapacityBlockNotifications function
      if (!content.includes('function scheduleCapacityBlockNotifications(endTime: number)')) {
        throw new Error(`Expected scheduleCapacityBlockNotifications function not found in ${filePath}`);
      }
  
      // Check for initialization call in activate function
      if (!content.includes('initializeCapacityBlockMonitoring()')) {
        throw new Error(`Expected initializeCapacityBlockMonitoring() call not found in activate function in ${filePath}`);
      }
  
      // Check for deactivate function
      if (!content.includes('export function deactivate()')) {
        throw new Error(`Expected deactivate function not found in ${filePath}`);
      }
  
      // Check for cancelAllCBNotifications call in deactivate
      if (!content.includes('cancelAllCBNotifications()')) {
        throw new Error(`Expected cancelAllCBNotifications() call not found in deactivate function in ${filePath}`);
      }
      
      console.log('PASS: Capacity block monitoring initialization found in extension.ts');
    });
  
    test('capacityBlockWarning.ts should exist with required functions', () => {
      const filePath = join(PATCHED_VSCODE_DIR, 'extensions/sagemaker-extension/src/capacityBlockWarning.ts');
      
      if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const content = readFileSync(filePath, 'utf8');
      
      // Check for readCapacityBlockMetadata function
      if (!content.includes('export function readCapacityBlockMetadata')) {
        throw new Error(`Expected readCapacityBlockMetadata function not found in ${filePath}`);
      }
  
      // Check for getCapacityBlockEndTime function
      if (!content.includes('export function getCapacityBlockEndTime')) {
        throw new Error(`Expected getCapacityBlockEndTime function not found in ${filePath}`);
      }
  
      // Check for showToastNotification function
      if (!content.includes('export async function showToastNotification')) {
        throw new Error(`Expected showToastNotification function not found in ${filePath}`);
      }
  
      // Check for showModalNotification function
      if (!content.includes('export async function showModalNotification')) {
        throw new Error(`Expected showModalNotification function not found in ${filePath}`);
      }
      
      console.log('PASS: capacityBlockWarning.ts has all required functions');
    });
});
