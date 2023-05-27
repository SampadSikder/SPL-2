from django.core.management.base import BaseCommand
import schedule
import time

class Command(BaseCommand):
    help = 'Runs the scheduler'

    def handle(self, *args, **options):
        while True:
            schedule.run_pending()
            time.sleep(1)
