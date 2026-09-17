// usePuter.js - React hook for Puter.js cloud OS features
import { useState, useEffect, useCallback } from 'react';

let puterInstance = null;
let puterPromise = null;

async function getPuter() {
  if (puterInstance) return puterInstance;
  if (!puterPromise) {
    puterPromise = import('@heyputer/puter.js').then((mod) => mod.default ?? mod);
  }
  puterInstance = await puterPromise;
  return puterInstance;
}

export function usePuter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const puter = await getPuter();
        const currentUser = await puter.auth.getUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.log('Puter auth check:', err.message);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Sign in with Puter (no email/password needed!)
  const signIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const puter = await getPuter();
      const result = await puter.auth.signIn();
      const currentUser = await puter.auth.getUser();
      setUser(currentUser);
      setIsAuthenticated(true);
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      const puter = await getPuter();
      await puter.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Write file to user's cloud drive
  const writeFile = useCallback(async (filename, content, options = {}) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Must be authenticated to write files');
      }

      const puter = await getPuter();
      const path = options.path || `digitallydefined/${filename}`;
      const mimeType = options.mimeType || 'text/plain';

      const file = await puter.fs.write(path, content, {
        overwrite: options.overwrite ?? true,
        mimeType: mimeType,
      });

      return {
        success: true,
        path: file.path,
        url: file.url,
        id: file.id,
      };
    } catch (err) {
      console.error('Puter writeFile error:', err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, [isAuthenticated]);

  // Read file from user's cloud drive
  const readFile = useCallback(async (path) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Must be authenticated to read files');
      }

      const puter = await getPuter();
      const file = await puter.fs.read(path);
      return {
        success: true,
        content: file,
        path: path,
      };
    } catch (err) {
      console.error('Puter readFile error:', err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, [isAuthenticated]);

  // List files in directory
  const listFiles = useCallback(async (directory = 'digitallydefined') => {
    try {
      if (!isAuthenticated) {
        throw new Error('Must be authenticated to list files');
      }

      const puter = await getPuter();
      const entries = await puter.fs.readdir(directory);
      return {
        success: true,
        files: entries.map((entry) => ({
          name: entry.name,
          path: entry.path,
          type: entry.type,
          size: entry.size,
          modified: entry.modified,
        })),
      };
    } catch (err) {
      console.error('Puter listFiles error:', err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, [isAuthenticated]);

  // Delete file
  const deleteFile = useCallback(async (path) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Must be authenticated to delete files');
      }

      const puter = await getPuter();
      await puter.fs.delete(path);
      return {
        success: true,
        message: `Deleted ${path}`,
      };
    } catch (err) {
      console.error('Puter deleteFile error:', err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, [isAuthenticated]);

  // Open app in Puter (e.g., open generated roadmap in text editor)
  const openApp = useCallback(async (appName, args = {}) => {
    try {
      const puter = await getPuter();
      const result = await puter.ui.launchApp(appName, args);
      return {
        success: true,
        result,
      };
    } catch (err) {
      console.error('Puter openApp error:', err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, []);

  // Show alert/toast notification
  const showAlert = useCallback(async (message, options = {}) => {
    try {
      const puter = await getPuter();
      await puter.ui.alert(message, options.buttons, options.type);
      return { success: true };
    } catch (err) {
      console.error('Puter showAlert error:', err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, []);

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    signIn,
    signOut,
    writeFile,
    readFile,
    listFiles,
    deleteFile,
    openApp,
    showAlert,
  };
}

export default usePuter;
