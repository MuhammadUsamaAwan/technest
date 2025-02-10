/// <reference types="vinxi/types/client" />
import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';

import { StartClient } from '@tanstack/start';

import { createRouter } from './router';

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
