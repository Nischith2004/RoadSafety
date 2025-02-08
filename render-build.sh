#!/bin/bash
set -e  # Stop on error

echo "Updating package lists..."
apt-get update

echo "Installing system dependencies..."
apt-get install -y libgirepository1.0-dev gir1.2-gtk-3.0 brltty liblouis-bin libsnmp-dev snmp 

echo "Removing unavailable Python dependencies..."
sed -i '/^Brlapi==/d' requirements.txt   # Remove Brlapi if present
sed -i '/^louis==/d' requirements.txt    # Remove louis if present
sed -i '/^netsnmp-python==/d' requirements.txt  # Remove netsnmp-python if present

echo "Installing Python dependencies..."
pip install -r requirements.txt
