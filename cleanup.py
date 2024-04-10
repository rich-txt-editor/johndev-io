def clean_requirements_optimized(input_file, output_file):
    with open(input_file, 'r') as f, open(output_file, 'w') as out:
        for line in f:
            line = line.strip()
            # Skip local file paths
            if line.startswith('file://'):
                continue
            # Reformat git links that are not exactly matching the expected pattern
            # This is a simplification; specifics depend on the exact requirements
            elif 'git+' in line:
                # Extract the package name for git links if possible
                package_name_search = re.search(r'#egg=([a-zA-Z0-9-_]+)', line)
                if package_name_search:
                    package_name = package_name_search.group(1)
                    # This assumes the line starts with the package name, which might not always be the case
                    git_link = line.split(' @ ')[-1]
                    line = f'{package_name} @ {git_link}'
                # Note: This else block could potentially drop some git links if they're not correctly formatted
                # Consider whether to add a more robust fallback here
            # Write the line to the output file
            out.write(f"{line}\n")

    print(f"Cleaned requirements have been written to {output_file}")

# Replace 'clean_requirements' with 'clean_requirements_optimized' in the example usage
