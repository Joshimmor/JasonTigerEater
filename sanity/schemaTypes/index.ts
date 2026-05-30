import { SchemaTypeDefinition } from 'sanity';
import {bioType} from './bio';
import {aboutType} from './about';
import {pressKitType} from './pressKit';
import { socialLinksType } from './socialLinks';

// All schemas registered here. Order determines sidebar order in Sanity Studio.
export const schema = [
  bioType,
  aboutType,
  pressKitType,
  socialLinksType,
] as SchemaTypeDefinition[];
