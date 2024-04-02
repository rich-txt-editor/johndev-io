import os

def find_manifests(directory):
    manifest_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file == 'manifest.json':
                manifest_files.append(os.path.join(root, file))
    return manifest_files

# Example usage
start_directory = './johndev-io'
manifests = find_manifests(start_directory)

for manifest in manifests:
    print(manifest)
