const fs = require('fs');
const path = require('path');

const removeTempBackupDirectoryRecursive = pathToDelete => {
  if (fs.existsSync(pathToDelete)) {
    fs.readdirSync(pathToDelete).forEach(file => {
      const currentPath = path.join(pathToDelete, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        removeTempBackupDirectoryRecursive(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(pathToDelete);
  }
};

const checkTempBackupDirectory = tempBackupDirectory => {
  try {
    if (fs.existsSync(tempBackupDirectory)) {
      removeTempBackupDirectoryRecursive(tempBackupDirectory);
    }
    fs.mkdirSync(tempBackupDirectory);
  } catch (e) {
    throw new Error('Unable to create temp folder');
  }
};

const getFileSizeInBytes = filename => {
  try {
    const stats = fs.statSync(filename);
    return stats.size;
  } catch (error) {
    return 0;
  }
};

const copyDatabase = (dbPath, tempBackupDirectory) => {
  const dbshm = `${dbPath}-shm`;
  const dbwal = `${dbPath}-wal`;

  if (!fs.existsSync(dbPath)) {
    throw new Error('No Database Found');
  }

  fs.copyFileSync(dbPath, path.join(tempBackupDirectory, 'CriptextEncrypt.db'));

  if (fs.existsSync(dbshm)) {
    fs.copyFileSync(
      dbshm,
      path.join(tempBackupDirectory, 'CriptextEncrypt.db-shm')
    );
  }
  if (fs.existsSync(dbwal)) {
    fs.copyFileSync(
      dbwal,
      path.join(tempBackupDirectory, 'CriptextEncrypt.db-wal')
    );
  }
};

module.exports = {
  getFileSizeInBytes,
  checkTempBackupDirectory,
  removeTempBackupDirectoryRecursive,
  copyDatabase
};
