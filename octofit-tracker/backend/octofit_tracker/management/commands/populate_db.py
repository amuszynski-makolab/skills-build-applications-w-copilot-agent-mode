from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard, Club
from django.db import transaction

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        with transaction.atomic():
            # self.stdout.write(self.style.WARNING('Deleting old data...'))
            # Usuwanie danych wyłączone z powodu problemów z Djongo

            self.stdout.write(self.style.SUCCESS('Creating teams...'))
            marvel = Team.objects.create(name='Marvel', description='Marvel Team')
            dc = Team.objects.create(name='DC', description='DC Team')

            self.stdout.write(self.style.SUCCESS('Creating users...'))
            ironman = User.objects.create(email='ironman@marvel.com', username='ironman', team=marvel)
            spiderman = User.objects.create(email='spiderman@marvel.com', username='spiderman', team=marvel)
            batman = User.objects.create(email='batman@dc.com', username='batman', team=dc)
            superman = User.objects.create(email='superman@dc.com', username='superman', team=dc)

            self.stdout.write(self.style.SUCCESS('Creating activities...'))
            Activity.objects.create(user=ironman, type='run', duration=30, date='2024-01-01')
            Activity.objects.create(user=spiderman, type='cycle', duration=45, date='2024-01-02')
            Activity.objects.create(user=batman, type='swim', duration=25, date='2024-01-03')
            Activity.objects.create(user=superman, type='run', duration=60, date='2024-01-04')

            self.stdout.write(self.style.SUCCESS('Creating workouts...'))
            w1 = Workout.objects.create(name='Pushups', description='Do 20 pushups')
            w2 = Workout.objects.create(name='Situps', description='Do 30 situps')
            w1.suggested_for.set([ironman, batman])
            w2.suggested_for.set([spiderman, superman])

            self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
            Leaderboard.objects.create(user=ironman, score=100)
            Leaderboard.objects.create(user=spiderman, score=80)
            Leaderboard.objects.create(user=batman, score=90)
            Leaderboard.objects.create(user=superman, score=110)

            self.stdout.write(self.style.SUCCESS('Creating clubs...'))
            Club.objects.create(
                name='Manga Maniacs',
                description='Explore the fantastic stories of the most interesting characters from Japanese Manga (graphic novels).',
                schedule='Tuesdays at 7pm',
                max_attendance=15,
            )

            self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
