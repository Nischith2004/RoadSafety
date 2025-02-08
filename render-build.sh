#!/bin/bash
set -e  # Stop on error

echo "Updating package lists..."
apt-get update

echo "Installing system dependencies..."
apt-get install -y libgirepository1.0-dev gir1.2-gtk-3.0 brltty

echo "Removing unavailable Python dependencies..."
sed -i '/^Brlapi==/d' requirements.txt  # Remove Brlapi if present

echo "Installing Python dependencies..."
pip install -r requirements.txt
