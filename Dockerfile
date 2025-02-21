FROM python:3.11-slim-bullseye

# Install dependencies first to leverage Docker caching
RUN pip install --no-cache-dir requests trio tqdm termcolor pwnedpasswords

# Copy project files
COPY . /opt/holehe
WORKDIR /opt/holehe

# Install the package
RUN pip install .