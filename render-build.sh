#!/bin/bash
set -e  # Stop on error

echo "Updating package lists..."
apt-get update

echo "Installing system dependencies..."
apt-get install -y \
    gobject-introspection \
    libgirepository1.0-dev \
    gir1.2-gtk-3.0 \
    libffi-dev \
    libcairo2-dev \
    pkg-config \
    python3-dev \
    libpango1.0-dev \
    libatk1.0-dev \
    libgdk-pixbuf2.0-dev \
    libglib2.0-dev \
    build-essential \
    meson \
    ninja-build

echo "Checking if gobject-introspection is installed..."
pkg-config --exists gobject-introspection-1.0 && echo "gobject-introspection found" || echo "gobject-introspection NOT found"

echo "Removing unavailable Python dependencies..."
sed -i '/^Brlapi==/d' requirements.txt        # Remove Brlapi if present
sed -i '/^louis==/d' requirements.txt         # Remove louis if present
sed -i '/^netsnmp-python==/d' requirements.txt # Remove netsnmp-python if present
sed -i '/^pwquality==/d' requirements.txt     # Remove pwquality if present

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
